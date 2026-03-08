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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetMyNotesQuery } from "../../features/notes/model/notesApiSlice";
import { useFocusEffect } from "@react-navigation/native";
import { NewNoteButton } from "./NewNoteButton/NewNoteButton";
import { useSelector } from "react-redux";
import { selectSearchQuery } from "../../features/search/model/slice";

export function NotesPage() {
    const [getMe, { data }] = useGetMeMutation();
    const [showHeader, setShowHeader] = useState(true);
    const {
        data: notesData,
        isLoading,
        isFetching,
        error,
        isError,
        refetch,
    } = useGetMyNotesQuery();

    const searchQuery = useSelector(selectSearchQuery);

    useFocusEffect(
        useCallback(() => {
            console.log("Screen focused");
            setShowHeader(true);
            refetch();

            return () => {
                console.log("Screen unfocused");
                setShowHeader(false);
            };
        }, [refetch]),
    );

    useEffect(() => {
        getMe();
    }, []);

    const filteredNotes = useMemo(() => {
        if (!notesData?.data) return [];

        let filtered = [...notesData.data].sort((a, b) =>
            b.updated_at.localeCompare(a.updated_at),
        );

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(
                (note) =>
                    note.title.toLowerCase().includes(query) ||
                    note.content.toLowerCase().includes(query),
            );
        }

        return filtered;
    }, [notesData, searchQuery]);

    return (
        <View style={s.container}>
            {showHeader && (
                <Portal>
                    <Header data={data?.user} />
                </Portal>
            )}
            {isFetching || (isLoading && <DefaultText>Loading...</DefaultText>)}
            {isError && (
                <DefaultText>Ошибка: {JSON.stringify(error)}</DefaultText>
            )}
            {/* TODO сделать заглушку */}
            {notesData && (
                <MasonryList
                    data={filteredNotes}
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
