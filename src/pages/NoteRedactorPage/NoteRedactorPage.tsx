import { View, TextInput, ScrollView, Dimensions } from "react-native";
import { useRef, useState, useEffect } from "react";
import {
    DefaultText,
    DefaultTextInput,
    styles,
    useDebouncedSave,
    useKeyboardDidShow,
} from "../../shared";
import { s } from "./NoteRedactorPageStyles";
import { useSelector } from "react-redux";
import {
    selectCurrentNote,
    setCurrentNote,
} from "../../entities/note/model/slice";
import { invertColorWithBrightness } from "../../entities/note/utils/invertColorWithBrigtness";
import { useDispatch } from "react-redux";
import { Note } from "../../entities/note/model/types";
import { useUpdateNoteMutation } from "../../features/notes/model/notesApiSlice";
import { NoteRedactorHeader } from "./NoteRedactorHeader/NoteRedactorHeader";
import { RouteProp } from "@react-navigation/native";
import { AppStackParamList } from "../../app/providers/navigation/types";

type NoteRedactorScreenRouteProp = RouteProp<AppStackParamList, "NoteRedactor">;

interface NoteRedactorPageProps {
    route?: NoteRedactorScreenRouteProp;
}

export function NoteRedactorPage({ route }: NoteRedactorPageProps) {
    const noteData = useSelector(selectCurrentNote);
    const dispatch = useDispatch();
    const [updateNote] = useUpdateNoteMutation();
    const isPublic = route?.params?.isPublic ?? true;

    const { keyboardVisible, keyboardHeight } = useKeyboardDidShow();
    const scrollViewRef = useRef<ScrollView>(null);
    const titleInputRef = useRef<TextInput>(null);
    const contentInputRef = useRef<TextInput>(null);

    const [focusedInput, setFocusedInput] = useState<
        "title" | "content" | null
    >(null);
    const [lastSelection, setLastSelection] = useState<{
        start: number;
        end: number;
    } | null>(null);
    const [titleInputLayout, setTitleInputLayout] = useState<{
        y: number;
        height: number;
        contentHeight: number;
    } | null>(null);
    const [contentInputLayout, setContentInputLayout] = useState<{
        y: number;
        height: number;
        contentHeight: number;
    } | null>(null);
    const [scrollOffset, setScrollOffset] = useState(0);

    const windowHeight = Dimensions.get("window").height;
    const visibleHeight = keyboardVisible
        ? windowHeight - keyboardHeight
        : windowHeight;

    const { debouncedSave, isSaving } = useDebouncedSave(
        async (data: Note) => {
            if (isPublic) return;
            try {
                await updateNote({
                    id: data.id,
                    title: data.title,
                    content: data.content,
                    color: data.color,
                    is_public: data.is_public,
                }).unwrap();
            } catch (error) {
                console.error("Failed to save note:", error);
            }
        },
        { delay: 500 },
    );

    const scrollToCursor = () => {
        if (!focusedInput || !scrollViewRef.current) return;

        const ref = focusedInput === "title" ? titleInputRef : contentInputRef;
        const layout =
            focusedInput === "title" ? titleInputLayout : contentInputLayout;
        const textLength =
            focusedInput === "title"
                ? noteData?.title.length || 0
                : noteData?.content.length || 0;

        if (!ref.current || !layout) return;

        const cursorPosition = lastSelection?.start ?? 0;

        ref.current.measureInWindow((x, y, width, height) => {
            const cursorYInInput =
                textLength === 0
                    ? 0
                    : (cursorPosition / textLength) * layout.contentHeight;
            const cursorScreenY = y + cursorYInInput;
            const desiredCursorY = visibleHeight - 20;

            if (cursorScreenY <= desiredCursorY) return;

            const scrollDelta = cursorScreenY - desiredCursorY;
            const targetOffset = scrollOffset + scrollDelta;

            scrollViewRef.current?.scrollTo({
                y: Math.max(0, targetOffset),
                animated: true,
            });
        });
    };

    // При появлении клавиатуры всегда прокручиваем к курсору
    useEffect(() => {
        scrollToCursor();
    }, [keyboardVisible]);

    const handleFocus = (inputType: "title" | "content") => {
        setFocusedInput(inputType);

        const ref = inputType === "title" ? titleInputRef : contentInputRef;
        if (ref.current && scrollViewRef.current) {
            ref.current.measureInWindow((x, y, width, height) => {
                // Если инпут слишком низко или высоко, подкручиваем
                if (y > visibleHeight - 100) {
                    const delta = y - (visibleHeight - 100);
                    scrollViewRef.current?.scrollTo({
                        y: scrollOffset + delta,
                        animated: true,
                    });
                } else if (y < 50) {
                    const delta = y - 50;
                    scrollViewRef.current?.scrollTo({
                        y: scrollOffset + delta,
                        animated: true,
                    });
                }
            });
        }
    };

    const handleSelectionChange = (
        event: any,
        inputType: "title" | "content",
    ) => {
        const { selection } = event.nativeEvent;
        setLastSelection(selection);

        if (focusedInput === inputType && keyboardVisible) {
            setTimeout(() => scrollToCursor(), 100);
        }
    };

    const handleInputLayout = (inputType: "title" | "content", event: any) => {
        const { y, height } = event.nativeEvent.layout;
        if (inputType === "title") {
            setTitleInputLayout((prev) =>
                prev ? { ...prev, y, height } : { y, height, contentHeight: 0 },
            );
        } else {
            setContentInputLayout((prev) =>
                prev ? { ...prev, y, height } : { y, height, contentHeight: 0 },
            );
        }
    };

    const handleContentSizeChange = (
        inputType: "title" | "content",
        event: any,
    ) => {
        const { height } = event.nativeEvent.contentSize;
        if (inputType === "title") {
            setTitleInputLayout((prev) =>
                prev ? { ...prev, contentHeight: height } : null,
            );
        } else {
            setContentInputLayout((prev) =>
                prev ? { ...prev, contentHeight: height } : null,
            );
        }
    };

    const handleScroll = (event: any) => {
        setScrollOffset(event.nativeEvent.contentOffset.y);
    };

    if (!noteData) return null;

    const { id, title, content, color } = noteData;

    const handleTitleChange = (newTitle: string) => {
        if (isPublic) return;
        const updatedNote = { ...noteData, title: newTitle } as Note;
        dispatch(setCurrentNote(updatedNote));
        debouncedSave(updatedNote);
    };

    const handleContentChange = (newContent: string) => {
        if (isPublic) return;
        const updatedNote = { ...noteData, content: newContent } as Note;
        dispatch(setCurrentNote(updatedNote));
        debouncedSave(updatedNote);
    };

    const handleColorChange = (newColor: string) => {
        if (isPublic) return;
        const updatedNote = { ...noteData, color: newColor } as Note;
        dispatch(setCurrentNote(updatedNote));
        debouncedSave(updatedNote);
    };

    return (
        <View style={[s.container, { backgroundColor: color }]}>
            <NoteRedactorHeader
                onColorChange={handleColorChange}
                noteData={noteData}
                debouncedSave={debouncedSave}
                isPublic={isPublic}
            />

            <ScrollView
                ref={scrollViewRef}
                style={s.scrollContainer}
                showsVerticalScrollIndicator={true}
                bounces={true}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                scrollEventThrottle={16}
                onScroll={handleScroll}
            >
                {isPublic ? (
                    <>
                        <DefaultText
                            style={{
                                color: invertColorWithBrightness(color, 0.3),
                                fontSize: 22,
                                fontWeight: "bold",
                                marginBottom: 16,
                                paddingHorizontal: styles.spacing.md,
                            }}
                        >
                            {title || "Без названия"}
                        </DefaultText>
                        <DefaultText
                            style={{
                                color: invertColorWithBrightness(color, 0.3),
                                fontSize: 16,
                                lineHeight: 24,
                                paddingHorizontal: styles.spacing.md,
                                marginBottom: 32,
                            }}
                        >
                            {content || "Заметка пуста"}
                        </DefaultText>
                    </>
                ) : (
                    <>
                        <DefaultTextInput
                            ref={titleInputRef}
                            placeholder="Название"
                            value={title}
                            onChangeText={handleTitleChange}
                            maxLength={255}
                            multiline
                            submitBehavior="blurAndSubmit"
                            onLayout={(e) => handleInputLayout("title", e)}
                            onContentSizeChange={(e) =>
                                handleContentSizeChange("title", e)
                            }
                            onFocus={() => handleFocus("title")}
                            onSelectionChange={(e) =>
                                handleSelectionChange(e, "title")
                            }
                            style={{
                                color: invertColorWithBrightness(color, 0.3),
                                fontSize: 22,
                                fontWeight: "bold",
                                marginBottom: 16,
                                padding: 0,
                                paddingHorizontal: styles.spacing.md,
                            }}
                            placeholderTextColor={
                                invertColorWithBrightness(color, 0.3) + "99"
                            }
                        />
                        <DefaultTextInput
                            ref={contentInputRef}
                            placeholder="Текст"
                            value={content}
                            onChangeText={handleContentChange}
                            maxLength={20000}
                            multiline
                            onLayout={(e) => handleInputLayout("content", e)}
                            onContentSizeChange={(e) =>
                                handleContentSizeChange("content", e)
                            }
                            onFocus={() => handleFocus("content")}
                            onSelectionChange={(e) =>
                                handleSelectionChange(e, "content")
                            }
                            style={{
                                color: invertColorWithBrightness(color, 0.3),
                                fontSize: 16,
                                padding: 0,
                                paddingHorizontal: styles.spacing.md,
                                flex: 1,
                                textAlignVertical: "top",
                                marginBottom: keyboardVisible
                                    ? keyboardHeight + 32
                                    : 32,
                                minHeight: 200,
                            }}
                            placeholderTextColor={
                                invertColorWithBrightness(color, 0.3) + "99"
                            }
                        />
                    </>
                )}
            </ScrollView>

            {isSaving && !isPublic && (
                <DefaultText
                    style={{
                        color: invertColorWithBrightness(color, 0.3) + "99",
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                    }}
                >
                    Saving...
                </DefaultText>
            )}
        </View>
    );
}
