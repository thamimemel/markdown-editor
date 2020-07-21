import marked from "marked";

const defaultState = {
  editorText:
    localStorage.getItem("editorText") ||
    `
\n# markdown-editor\r\n\r\nmarkdown-editor is a React App that uses [Marked] to let you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\r\n\r\n  \r\nHow To Use The Demo\r\n-------------------\r\n\r\n1. Type in stuff on the left.\r\n2. See the live updates on the right.\r\n\r\nThat's it.  Pretty simple. you can save your work locally (browser local storage) if you plan on coming back, There's also the option to import your files or export your work in 4 different :\r\n\r\n- **html:**  Web Page file.\r\n- **md:**  Default markdown files extension.\r\n- **txt:**  Good old txt file.\r\n\r\n\`Why Markdown?\`\r\n-------------\r\n\r\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\r\n\r\n> The overriding design goal for Markdown's\r\n> formatting syntax is to make it as readable\r\n> as possible. The idea is that a\r\n> Markdown-formatted document should be\r\n> publishable as-is, as plain text, without\r\n> looking like it's been marked up with tags\r\n> or formatting instructions.\r\n\r\nYou can also make text **bold**... whoa!\r\nOr _italic_.\r\nOr... wait for it... **_both!_**\r\nAnd feel free to go crazy ~~crossing stuff out~~.\r\n\r\nThere's also [links](https://www.freecodecamp.com), and\r\n> Block Quotes!\r\n\r\nAnd if you want to get really crazy, even tables:\r\n\r\nWild Header | Crazy Header | Another Header?\r\n------------ | ------------- | ------------- \r\nYour content can | be here, and it | can be here....\r\nAnd here. | Okay. | I think we get it.\r\n\r\n- And of course there are lists.\r\n  - Some are bulleted.\r\n     - With different indentation levels.\r\n        - That look like this.\r\n\r\n\r\n1. And there are numbererd lists too.\r\n1. Use just 1s if you want! \r\n1. But the list goes on...\r\n- Even if you use dashes or asterisks.\r\n* And last but not least, let's not forget embedded images:\r\n\r\n![React Logo w/ Text](https://goo.gl/Umyytc)\r\n\r\n\r\n\r\n[Marked]: https://github.com/markedjs/marked/\r\n[Markdown]: http://daringfireball.net/projects/markdown/\r\n\r\n  
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
