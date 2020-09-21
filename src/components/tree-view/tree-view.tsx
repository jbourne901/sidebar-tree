import React from 'react';
import './tree-view.css';
import ITreeNode from '../../types/tree';
import TreeNode from "./tree-node";

interface IProps {
  tree: ITreeNode[];
}

const TreeView = (props: IProps) => {

  const nodes = [];
  for(let i=0; i<props.tree.length; i++) {
    const t = props.tree[i];
    const n = (<TreeNode key={i} node={t} />);
    nodes.push(n);
  }

  return (
      <ul className="treeview">
        {nodes}
      </ul>
  );
}

export default TreeView;

