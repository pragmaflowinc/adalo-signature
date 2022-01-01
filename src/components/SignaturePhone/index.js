import React, { Component, useRef } from "react";
import { View, TouchableHighlight, Text } from "react-native";

import Signature from "react-native-signature-canvas";

const SignaturePhone = ({
  _width,
  _height,
	backgroundColor = "#ffffff",
	penColor = "#000000",
	buttonBackgroundColor = "#000000",
	clearText = "Clear",
	saveText = "Save",
	buttonTextColor = "borderColor",
  borderColor,
	imageOutputAction = () => {}
}) => {
  const ref = useRef();

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    console.log("end");
    ref.current.readSignature();
  };
  return (
    <View
      style={{
        width: _width,
        height: _height,
        borderColor: borderColor,
        borderWidth: 1,
      }}
    >
      <Signature
        ref={ref}
        onOK={(img) => {
          if (imageOutputAction) imageOutputAction(img);
        }}
        webStyle={`
            .m-signature-pad {box-shadow: none; border: none } 
            .m-signature-pad--body {border: none}
            .m-signature-pad--body canvas {border-radius: 0px}
            .m-signature-pad--footer {display: none; margin: 0px;}
          `}
        penColor={penColor}
        backgroundColor={backgroundColor}
        descriptionText=""
        autoClear={true}
        imageType={"image/svg+xml"}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <TouchableHighlight
            onPress={handleClear}
            style={{ backgroundColor: buttonBackgroundColor, padding: 8 }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: buttonTextColor,
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              {clearText}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableHighlight
            onPress={handleConfirm}
            style={{ backgroundColor: buttonBackgroundColor, padding: 8 }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: buttonTextColor,
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              {saveText}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default SignaturePhone;
