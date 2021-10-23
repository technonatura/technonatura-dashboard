import React from "react";

import {
  useEditor,
  EditorContent,
  Editor,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TypographyExtension from "@tiptap/extension-typography";
import UnderlineExtension from "@tiptap/extension-underline";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";
import TextAlign from "@tiptap/extension-text-align";

import { styled } from "@mui/material/styles";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ProjectCreateContentToolbar from "./Toolbar";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

// import "./styles.scss";
import EditorStyled from "./style";

export default function EditorComponent({
  setContent,
}: {
  setContent: (value: string) => void;
}) {
  const limit = 5000;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TypographyExtension,
      UnderlineExtension,
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      Code,
      Link,
      CodeBlockLowlight,
      CharacterCount.configure({
        limit,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
  
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `,
  });

  React.useMemo(() => {
    if (editor?.getHTML()) setContent(editor?.getHTML());
  }, [editor?.getHTML()]);

  const percentage = editor
    ? Math.round((100 / limit) * editor.getCharacterCount())
    : 0;
  return (
    <EditorStyled>
      {editor && <ProjectCreateContentToolbar editor={editor} />}
      <EditorContent editor={editor} />
      {editor && (
        <div
          className={`character-count ${
            editor.getCharacterCount() === limit
              ? "character-count--warning"
              : ""
          }`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <svg
            height="20"
            width="20"
            viewBox="0 0 20 20"
            className="character-count__graph"
          >
            <circle r="10" cx="10" cy="10" fill="#e9ecef" />
            <circle
              r="5"
              cx="10"
              cy="10"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
              transform="rotate(-90) translate(-20)"
            />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>

          <div className="character-count__text" style={{ marginLeft: 5 }}>
            {editor.getCharacterCount()}/{limit} characters
          </div>
        </div>
      )}
    </EditorStyled>
  );
}
