import React, { useState } from "react";

const Notification = (props) => {
  const notificationBaseColor = "rgba(0,0,0,.07)";

  const handleClose = () => {
    props.setVisibleNotification({
      ...props.visibleNotification,
      visible: false,
    });
  };

  if (!props.visibleNotification.visible == true) {
    return null;
  }

  return (
    <div
      style={{
        height: "100%",
        position: "fixed",
        right: "0px",
        bottom: "0px",
        width: "22em",
        height: "12em",
        zIndex: "1000",
        justifyContent: "right",
        alignItems: "end",
      }}
    >
      <div
        style={{
          margin: "1em",
          marginBottom: "2em",
          backgroundColor: notificationBaseColor,
          width: "20em",
          height: "10em",
          borderRadius: ".5em",
          boxShadow: "5px 5px 5px rgba(0,0,0, .5)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <button
            style={{
              height: "2.2em",
              width: "2.2em",
              margin: ".1em",
              border: "none",
            }}
            onClick={handleClose}
          >
            X
          </button>
        </div>

        <div style={{ flex: "flex" }}>
          <h4 style={{ textAlign: "center" }}>New Book Added!</h4>
          <p style={{ margin: "1em" }}>{props.visibleNotification.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
