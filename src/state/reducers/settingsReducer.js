const defaultState = localStorage.getItem("settings")
  ? JSON.parse(localStorage.getItem("settings"))
  : {
      editor: {
        darkMode: true,
        fontSize: 16,
        autoSave: false,
      },
      preview: {
        darkMode: false,
      },
    };

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_EDITOR_DARK_MODE":
      return {
        ...state,
        editor: {
          ...state.editor,
          darkMode: action.darkMode,
        },
      };
    case "SET_EDITOR_FONT_SIZE":
      return {
        ...state,
        editor: {
          ...state.editor,
          fontSize: action.fontSize,
        },
      };
    case "SET_EDITOR_AUTO_SAVE":
      return {
        ...state,
        editor: {
          ...state.editor,
          autoSave: action.autoSave,
        },
      };
    case "SET_PREVIEW_DARK_MODE":
      return {
        ...state,
        preview: {
          ...state.preview,
          darkMode: action.darkMode,
        },
      };

    default:
      return state;
  }
};
