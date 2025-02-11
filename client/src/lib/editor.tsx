import { Editor as CraftEditor } from '@craftjs/core';
import { Text } from "@/components/editor/components/Text";
import { Button } from "@/components/editor/components/Button";
import { Container } from "@/components/editor/components/Container";
import { Form } from "@/components/editor/components/Form";
import { Input } from "@/components/editor/components/Input";
import { Row } from "@/components/editor/components/Row";
import { Column } from "@/components/editor/components/Column";

// Enable craft.js editor with our components
export const Editor = ({children}: {children: React.ReactNode}) => (
  <CraftEditor
    enabled={true}
    resolver={{
      Text,
      Button,
      Container,
      Form,
      Input,
      Row,
      Column,
    }}
  >
    {children}
  </CraftEditor>
);

// List of available components for the component panel
export const componentTypes = [
  {
    type: "Text",
    label: "Text",
    props: { text: "New Text" },
  },
  {
    type: "Button",
    label: "Button",
    props: { text: "Click Me" },
  },
  {
    type: "Container",
    label: "Container",
    props: {},
  },
  {
    type: "Input",
    label: "Input Field",
    props: { placeholder: "Enter text..." },
  },
  {
    type: "Row",
    label: "Row",
    props: {},
  },
  {
    type: "Column",
    label: "Column",
    props: {},
  },
  {
    type: "Form",
    label: "Form",
    props: {},
  },
];