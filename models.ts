interface Image {
  b64_json: string;
}

export interface IMessage {
  content?: string;
  question: string;
  isPending: boolean;
  isNewContent: boolean;
  images?: Image[];
  activeTab: TabEnum;
}

export interface PromptFormProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  activeTab: TabEnum;
  onNewChat: () => void;
}

export interface ResponseDisplayProps {
  messages: IMessage[];
}

export interface IPrompt {
  role: "user" | "system";
  content: string;
}

export interface AnimatedDivProps {
  content: string;
}

export enum TabEnum {
  Text = "Text",
  Image = "Image",
}

export type TabItem = {
  label: TabEnum;
  isActive?: boolean;
};

export interface HeaderProps {
  tabs: TabItem[];
  onTabClicked: (string: TabEnum) => void;
  onDrawerOpen: (isOpen: boolean) => void;
}

export interface ChatProps {
  activeTab: TabEnum;
  isDrawerOpen: boolean;
  onDrawerOpen: (isOpen: boolean) => void;
}

export interface ImageGalleryProps {
  messages: IMessage[];
}

export interface TextMessageProps {
  isNewContent: boolean;
  content: string;
}

export interface ImageMessageProps {
  images?: Image[];
}

export interface IHistory {
  key: string;
  messages: IMessage[];
}

export interface DrawerProps {
  isOpen: boolean;
  history: IHistory[];
  handleDrawerOpen: (isOpen: boolean) => void;
  setMessages: (message: IMessage[]) => void;
}
