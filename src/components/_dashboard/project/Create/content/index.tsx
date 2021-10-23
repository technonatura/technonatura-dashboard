import React from "react";
import dynamic from "next/dynamic";

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

import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";

import CodeBlockComponent from "./CodeBlockComponent";
import { lowlight } from "lowlight/index";

import { styled } from "@mui/material/styles";
import UndoIcon from "@mui/icons-material/Undo";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import RedoIcon from "@mui/icons-material/Redo";
import CodeIcon from "@mui/icons-material/Code";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import ClearIcon from "@mui/icons-material/Clear";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import ListIcon from "@mui/icons-material/List";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography, Divider } from "@mui/material";

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

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <StyledToggleButtonGroup
            size="small"
            exclusive
            aria-label="text alignment"
          >
            <ToggleButton
              value="h1"
              aria-label="H1 Text"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              selected={editor.isActive("heading", { level: 1 })}
            >
              <Typography fontWeight={900}>H1</Typography>
            </ToggleButton>
            <ToggleButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              selected={editor.isActive("heading", { level: 2 })}
              value="h2"
              aria-label="H2 Text"
            >
              <Typography fontWeight={800}>H2</Typography>
            </ToggleButton>
            <ToggleButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              selected={editor.isActive("heading", { level: 3 })}
              value="h3"
              aria-label="H3 Text"
            >
              <Typography fontWeight={800}>H3</Typography>
            </ToggleButton>
            <ToggleButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              selected={editor.isActive("heading", { level: 4 })}
              value="h4"
              aria-label="H4 Text"
            >
              <Typography fontWeight={700}>H4</Typography>
            </ToggleButton>
            <ToggleButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 5 }).run()
              }
              selected={editor.isActive("heading", { level: 5 })}
              value="h5"
              aria-label="H5 Text"
            >
              <Typography fontWeight={600}>H5</Typography>
            </ToggleButton>
            <ToggleButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 6 }).run()
              }
              selected={editor.isActive("heading", { level: 6 })}
              value="h6"
              aria-label="H6 Text"
            >
              <Typography fontWeight={500}>H6</Typography>
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              selected={editor.isActive({ textAlign: "left" })}
              value="left"
              aria-label="left aligned"
            >
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              selected={editor.isActive({ textAlign: "center" })}
              value="center"
              aria-label="Center aligned"
            >
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              selected={editor.isActive({ textAlign: "right" })}
              value="right"
              aria-label="Right aligned"
            >
              <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              selected={editor.isActive({ textAlign: "justify" })}
              value="justify"
              aria-label="Justify aligned"
            >
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
          <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
          <StyledToggleButtonGroup size="small" aria-label="text formatting">
            <ToggleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              selected={editor.isActive("bold")}
              value="bold"
              aria-label="bold"
            >
              <FormatBoldIcon />
            </ToggleButton>

            <ToggleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              value="italic"
              aria-label="italic"
              selected={editor.isActive("italic")}
            >
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              value="strike"
              aria-label="strike"
              selected={editor.isActive("strike")}
            >
              <FormatStrikethroughIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              value="code"
              aria-label="code"
              selected={editor.isActive("code")}
            >
              <CodeIcon />
            </ToggleButton>

            <ToggleButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              value="highlight"
              aria-label="highlight"
              selected={editor.isActive("highlight")}
            >
              <BorderColorIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              value="blockQuote"
              aria-label="blockQuote"
              selected={editor.isActive("blockQuote")}
            >
              <FormatQuoteIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              selected={editor.isActive("HorizontalRule")}
              value="HorizontalRule"
              aria-label="HorizontalRule"
            >
              <HorizontalRuleIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().setParagraph().run()}
              selected={editor.isActive("paragraph")}
              value="paragraph"
              aria-label="paragraph"
            >
              <FormatTextdirectionRToLIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              selected={editor.isActive("underline")}
              value="underline"
              aria-label="underline"
            >
              <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => {
                const url = window.prompt("URL");

                if (url) {
                  editor.chain().focus().setImage({ src: url }).run();
                }
              }}
              selected={editor.isActive("image")}
              value="image"
              aria-label="image"
            >
              <ImageIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => {
                const previousUrl = editor.getAttributes("link").href;
                const url = window.prompt("URL", previousUrl);

                // cancelled
                if (url === null) {
                  return;
                }

                // empty
                if (url === "") {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .unsetLink()
                    .run();

                  return;
                }

                // update link
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: url })
                  .run();
              }}
              selected={editor.isActive("link")}
              value="link"
              aria-label="link"
            >
              <LinkIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              value="bullettList"
              aria-label="bullettList"
              selected={editor.isActive("bulletList")}
            >
              <FormatListBulletedIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              value="orderedList"
              aria-label="orderedList"
              selected={editor.isActive("orderedList")}
            >
              <FormatListNumberedIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
          <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

          <StyledToggleButtonGroup
            size="small"
            exclusive
            aria-label="text alignment"
          >
            <ToggleButton
              onClick={() => editor.chain().focus().undo().run()}
              value="undo"
              aria-label="undo"
            >
              <UndoIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().redo().run()}
              value="redo"
              aria-label="redo"
            >
              <RedoIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>

          <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

          <StyledToggleButtonGroup
            size="small"
            exclusive
            aria-label="text alignment"
          >
            <ToggleButton
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
              value="clear-mark"
              aria-label="clear-mark"
            >
              <LayersClearIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => editor.chain().focus().clearNodes().run()}
              value="clear-node"
              aria-label="clear-node"
            >
              <ClearIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Paper>
      </div>
    </>
  );
};

export default function EditorComponent() {
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
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight: lowlight }),
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

  const percentage = editor
    ? Math.round((100 / limit) * editor.getCharacterCount())
    : 0;
  return (
    <EditorStyled>
      {editor && <MenuBar editor={editor} />}
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
