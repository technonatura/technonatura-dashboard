import styled from "@emotion/styled";

const EditorStyled = styled.div`
  /* Basic editor styles */

  div[contenteditable="true"] {
    border: none;
    background-color: transparent;
    outline: none;
  }

  code {
    background-color: #f4f6f8;
    border-radius: 5px;
    padding: 5px 5px;
  }

  .ProseMirror {
    > * + * {
      margin-top: 1em;
    }

    img {
      max-width: 100%;
      height: auto;

      &.ProseMirror-selectednode {
        outline: 3px solid #68cef8;
      }
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid #00ab55;
    }
    ul,
    ol {
      padding: 0 1.5rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }

    hr {
      border: none;
      border-top: 2px solid #0d0d0d;
      margin: 2rem 0;
    }
  }
`;

export default EditorStyled;
