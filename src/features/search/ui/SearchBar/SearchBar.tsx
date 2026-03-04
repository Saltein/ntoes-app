import { View, Pressable } from "react-native";
import SearchIcon from "../../../../shared/assets/icons/search.svg";
import ClearIcon from "../../../../shared/assets/icons/xmark.svg";
import { DefaultTextInput, styles } from "../../../../shared";
import { s } from "./SearchBarStyles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectSearchQuery, setSearchQuery } from "../../model/slice";

export default function SearchBar() {
    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);

    function handleChangeText(text: string) {
        dispatch(setSearchQuery(text));
    }

    function handleClearText() {
        dispatch(setSearchQuery(""));
    }

    return (
        <View style={s.searchWrapper}>
            <SearchIcon height={20} width={20} color={styles.colors.textMain} />
            <DefaultTextInput
                style={s.textInput}
                onChangeText={handleChangeText}
                value={searchQuery}
            />
            <Pressable style={s.clearButton} onPress={handleClearText}>
                <ClearIcon
                    height={20}
                    width={20}
                    color={styles.colors.textMain}
                />
            </Pressable>
        </View>
    );
}
