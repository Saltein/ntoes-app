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
import {
    useGetMyNotesQuery,
    useGetPublicNotesQuery,
} from "../../features/notes/model/notesApiSlice";
import { useFocusEffect } from "@react-navigation/native";
import { NewNoteButton } from "./NewNoteButton/NewNoteButton";
import { useSelector } from "react-redux";
import { selectSearchQuery } from "../../features/search/model/slice";

interface NotesPageProps {
    isPublic?: boolean;
}

export function NotesPage({ isPublic = false }: NotesPageProps) {
    const [getMe, { data }] = useGetMeMutation();
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: publicData,
        isLoading: publicLoading,
        isFetching: publicFetching,
        error: publicError,
        isError: publicIsError,
        refetch: publicRefetch,
    } = useGetPublicNotesQuery(currentPage, {
        skip: !isPublic,
    });

    const {
        data: notesData,
        isLoading,
        isFetching,
        error,
        isError,
        refetch,
    } = useGetMyNotesQuery(undefined, {
        skip: isPublic,
    });

    const searchQuery = useSelector(selectSearchQuery);

    useFocusEffect(
        useCallback(() => {
            if (isPublic) {
                publicRefetch();
            } else {
                refetch();
            }
        }, [isPublic, refetch, publicRefetch]),
    );

    useEffect(() => {
        getMe();
    }, []);

    const filteredNotes = useMemo(() => {
        const sourceData = isPublic ? publicData : notesData;
        if (!sourceData?.data) return [];

        let filtered = [...sourceData.data].sort((a, b) =>
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
    }, [notesData, publicData, searchQuery, isPublic]);

    const loading = isPublic
        ? publicLoading || publicFetching
        : isLoading || isFetching;
    const hasError = isPublic ? publicIsError : isError;
    const errorData = isPublic ? publicError : error;

    return (
        <View style={s.container}>
            {!isPublic && <Header data={data?.user} />}
            <LinearGradient
                colors={[styles.colors.backgroundMain, "transparent"]}
                style={{
                    height: isPublic ? styles.spacing.xs : 64,
                    zIndex: 5,
                    width: "200%",
                    position: "absolute",
                    top: styles.spacing.xs,
                }}
            />
            {hasError && (
                <DefaultText>Ошибка: {JSON.stringify(errorData)}</DefaultText>
            )}
            {/* TODO сделать заглушку */}
            {(isPublic ? publicData : notesData) && (
                <MasonryList
                    data={filteredNotes}
                    numColumns={2}
                    style={{
                        gap: styles.spacing.xs,
                        paddingVertical: isPublic
                            ? styles.spacing.xs
                            : 48 + styles.spacing.xs,
                    }}
                    renderItem={({ item }) => {
                        const note = item as Note;
                        return <NoteCard data={note} isPublic={isPublic} />;
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
            {!isPublic && <NewNoteButton />}
        </View>
    );
}
