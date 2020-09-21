export interface ITreeRow {
    name: string;
    icon: JSX.Element;
}

export default interface ITreeNode {
    label: string,
    items: ITreeRow[]
    isOpen: boolean;
};

