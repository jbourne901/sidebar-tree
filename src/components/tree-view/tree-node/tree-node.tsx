import React, {useState} from 'react';
import './tree-node.css';
import ITreeNode from '../../../types/tree';

interface IProps {
  node: ITreeNode;
}

const TreeNode = (props: IProps) => {
    const [isOpen, setOpen] = useState<boolean>(props.node.isOpen);
    const toggleOpen = () => {
        console.log(`toggleOpen`)
        setOpen(!isOpen);
    };

    const rows = [];    
    for(let i=0; isOpen && i<props.node.items.length; i++) {
        const it = props.node.items[i];
        const r = (
            <li key={i} 
                className="treenode-item"                
            >
                {it.icon}
                <span   
                    className="treenode-label noselect"
                    onSelect={(e) => {e.preventDefault(); e.stopPropagation()}}
                >
                    {it.name}
                </span>
            </li>
        );
        rows.push(r);
    }
    let circle = "fa-plus-circle";
    if(isOpen) {
        circle = "fa-minus-circle";
    }
    return (        
          <li className="treenode-listitems">
              <a className="treenode-listheader" onClick={()=>{toggleOpen()}}>
                <i className={`fas ${circle} treenode-icon`}></i>
                <span className="treenode-menulabel noselect">
                    {props.node.label}                
                </span>
                <ul className="treenode">
                    {rows} 
                </ul>
              </a>
          </li>                                
    );
};

export default TreeNode;
  