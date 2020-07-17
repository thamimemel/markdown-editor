import marked from "marked";

const defaultState = {
  editorText:
    localStorage.getItem("editorText") ||
    `\n# markdown-editor\n\nmarkdown-editor is a React App that uses [Marked] to let you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n
  \nHow To Use The Demo\n-------------------\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple. you can save your work locally (browser local storage) if you plan on coming back, There's also the option to import your files or export your work in 4 different :\n\n- **html:**  Web Page file.\n- **md:**  Default markdown files extension.\n- **txt:**  Good old txt file.\n\n\`Why Markdown?\`\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n
  `,
};

defaultState.preview = marked(defaultState.editorText);
export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_EDITOR_TEXT":
      return { ...state, editorText: action.editorText };
    case "SET_PREVIEW_TEXT":
      return { ...state, preview: action.preview };
    default:
      return state;
  }
};
