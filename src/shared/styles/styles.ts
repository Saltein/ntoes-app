import { invertColorWithBrightness } from "../../entities/note/utils/invertColorWithBrightness";

const mainColor = "#ebe1cc";
const invertedMainColor = invertColorWithBrightness(mainColor, 0.3);
const invertedMainColorBright = invertColorWithBrightness(mainColor, 0.9);

export const styles = {
    colors: {
        backgroundMain: mainColor,
        backgroundSurface: `${invertedMainColor}33`,
        backgroundItems: "#fafafa",
        textMain: invertedMainColor,
        textMuted: `${invertedMainColor}99`,
        textBrightMain: invertedMainColorBright,
        textBrightMuted: `${invertedMainColorBright}99`,
        border: invertedMainColor,
        button: invertedMainColor,

        error: "#EF4444",
        errorBack: "#ffeaea",
        warning: "#F59E0B",
        warningBack: "#fff5e3",
        info: "#74c3ff",
        infoBack: "#ddf2ff",
    },
    radius: {
        xxs: 2,
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        xxl: 24,
    },
    spacing: {
        xxs: 4,
        xs: 8,
        sm: 12,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 40,
    },
};
