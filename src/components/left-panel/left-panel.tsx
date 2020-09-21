import React from 'react';
import './left-panel.css';
import TreeView from "../tree-view"
import {InputOutlined, History, DeviceHub, AddShoppingCartOutlined, RemoveShoppingCartOutlined, CreditCardOutlined, PublicOutlined, ExposurePlus1Outlined, ExposureNeg1Outlined, ScheduleOutlined, PlayCircleOutline, RecordVoiceOverOutlined, MicOutlined, PhoneForwardedOutlined, PhoneMissedOutlined, PhoneCallbackOutlined} from "@material-ui/icons";
import ITree from '../../types/tree';

const LeftPanel = () => {
  const menu: ITree[] = [
    {
      label: "Logic Blocks",
      items:  [
        {name: "Switch", icon: <DeviceHub />},
        {name: "Increment", icon: <ExposurePlus1Outlined />},
        {name: "Decrement", icon: <ExposureNeg1Outlined />},
        {name: "API", icon: <PublicOutlined />},
        {name: "Schedule", icon: <ScheduleOutlined />},
      ],
      isOpen: true
    },
    {
      label: "Voice Blocks",
      items:  [
        {name: "Announcement", icon: <PlayCircleOutline />},
        {name: "Record", icon: <MicOutlined />},
        {name: "Text-To-Speech", icon: <RecordVoiceOverOutlined />},
        {name: "DTMF Input", icon: <InputOutlined />},
      ],
      isOpen: true
    },
    {
      label: "Call Control",
      items:  [
        {name: "Queue", icon: <History />},
        {name: "Transfer", icon: <PhoneForwardedOutlined />},
        {name: "Busy", icon: <PhoneMissedOutlined />},
        {name: "Callback", icon: <PhoneCallbackOutlined />},
      ],
      isOpen: true
    },
    {
      label: "Orders",
      items:  [
        {name: "Add to Order", icon: <AddShoppingCartOutlined />},
        {name: "Remove from Order", icon: <RemoveShoppingCartOutlined />},
        {name: "Credit Card", icon: <CreditCardOutlined />},
      ],
      isOpen: true
    },
  ];

  return (
    <div className="left-panel">
      <h6 className="left-panel-header">Block Templates</h6>
      <hr className="left-panel-hr"/>      
      <TreeView tree={menu}/>
    </div>
  );
}

export default LeftPanel;
