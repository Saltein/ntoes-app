import { View } from "react-native";
import { s } from "./NotesPageStyles";
import { NoteCard } from "../../entities";
import { Note, PublicNote } from "../../entities/note/model/types";
import MasonryList from "@react-native-seoul/masonry-list";
import { DefaultText, styles, Warning } from "../../shared";
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
import { Skeleton } from "../../shared/ui/Skeleton/Skeleton";

interface NotesPageProps {
    isPublic?: boolean;
}

export function NotesPage({ isPublic = false }: NotesPageProps) {
    const [getMe, { data }] = useGetMeMutation();
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: publicData,
        error: publicError,
        isError: publicIsError,
        refetch: publicRefetch,
    } = useGetPublicNotesQuery(currentPage, {
        skip: !isPublic,
    });

    const {
        data: notesData,
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

    type NoteListItem = {
        note: Note;
        nickname?: string;
    };

    const filteredNotes = useMemo(() => {
        const sourceData = isPublic ? publicData : notesData;
        if (!sourceData?.data) return [];

        const normalized: NoteListItem[] = isPublic
            ? (sourceData.data as PublicNote[]).map((item) => ({
                  note: item.note,
                  nickname: item.nickname,
              }))
            : (sourceData.data as Note[]).map((note) => ({
                  note,
              }));

        let filtered = [...normalized].sort((a, b) =>
            b.note.updated_at.localeCompare(a.note.updated_at),
        );

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();

            filtered = filtered.filter(
                (item) =>
                    item.note.title.toLowerCase().includes(query) ||
                    item.note.content.toLowerCase().includes(query),
            );
        }

        return filtered;
    }, [notesData, publicData, searchQuery, isPublic]);

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
                <Warning type={"error"} content={JSON.stringify(errorData)} />
            )}
            {(isPublic ? publicData : notesData) ? (
                <MasonryList
                    data={filteredNotes}
                    numColumns={2}
                    style={{
                        gap: styles.spacing.xs,
                        paddingTop: isPublic
                            ? styles.spacing.xs
                            : 48 + styles.spacing.xs,
                        paddingBottom: 48 + styles.spacing.xs,
                    }}
                    renderItem={({ item }) => {
                        const note = item as NoteListItem;
                        return (
                            <NoteCard
                                data={note.note}
                                nickname={note.nickname}
                                isPublic={isPublic}
                            />
                        );
                    }}
                    keyExtractor={(item) =>
                        (item as NoteListItem).note.id.toString()
                    }
                />
            ) : (
                <MasonryList
                    data={Array(20)
                        .fill(0)
                        .map(
                            () =>
                                Math.floor(Math.random() * (320 - 48 + 1)) + 48,
                        )}
                    numColumns={2}
                    style={{
                        gap: styles.spacing.xs,
                        paddingVertical: isPublic
                            ? styles.spacing.xs
                            : 48 + styles.spacing.xs,
                    }}
                    renderItem={({ item }) => {
                        const height = item as number;
                        return (
                            <Skeleton
                                style={{
                                    width: "100%",
                                    height: height,
                                    borderRadius: styles.radius.md,
                                    marginBottom: styles.spacing.xs,
                                }}
                                hasBorder
                            />
                        );
                    }}
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
