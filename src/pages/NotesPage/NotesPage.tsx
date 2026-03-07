import { View } from "react-native";
import { s } from "./NotesPageStyles";
import { NoteCard } from "../../entities";
import { Note } from "../../entities/note/model/types";
import MasonryList from "@react-native-seoul/masonry-list";
import { DefaultText, styles } from "../../shared";
import { Header } from "../../widgets";
import { useGetMeMutation } from "../../features/auth/model/authApiSlice";
import { Portal } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { useGetMyNotesQuery } from "../../features/notes/model/notesApiSlice";
import { useFocusEffect } from "@react-navigation/native";
import { NewNoteButton } from "./NewNoteButton/NewNoteButton";

export function NotesPage() {
    const [getMe, { data }] = useGetMeMutation();
    const [showHeader, setShowHeader] = useState(true);
    const {
        data: notesData,
        isLoading,
        isFetching,
        error,
    } = useGetMyNotesQuery();

    useFocusEffect(() => {
        setShowHeader(true);
        return () => {
            setShowHeader(false);
        };
    });

    useEffect(() => {
        getMe();
    }, []);

    return (
        <View style={s.container}>
            {showHeader && (
                <Portal>
                    <Header data={data?.user} />
                </Portal>
            )}
            {isFetching || (isLoading && <DefaultText>Loading...</DefaultText>)}
            {/* TODO сделать заглушку */}
            {notesData && (
                <MasonryList
                    data={notesData.data}
                    numColumns={2}
                    style={{
                        gap: styles.spacing.xs,
                        paddingVertical: 48 + styles.spacing.xs,
                    }}
                    renderItem={({ item }) => {
                        const note = item as Note;
                        return <NoteCard data={note} />;
                    }}
                    keyExtractor={(item) => (item as Note).id.toString()}
                />
            )}
            <LinearGradient
                colors={["transparent", styles.colors.backgroundMain]}
                style={{
                    height: 48,
                    width: "200%",
                    position: "absolute",
                    bottom: 8,
                }}
            />
            <NewNoteButton />
        </View>
    );
}
