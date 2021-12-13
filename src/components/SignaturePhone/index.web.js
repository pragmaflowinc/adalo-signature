import React, { Component } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Text, View, StyleSheet } from 'react-native'
class ReactSig extends Component {
	styles ={//= StyleSheet.create({
		wrapper: {
			borderColor: this.props.borderColor,
			//backgroundColor: this.props.backgroundColor,
			backgroundColor: this.props.backgroundColor,
			borderStyle: 'solid',
			borderWidth: 2,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',

			// width: this.props.width,
			// height: this.props.height,
		},
		div: {
			//backgroundColor: this.props.backgroundColor,
			width: "100%",
			backgroundColor: this.props.buttonBackgroundColor
			//border: "1px solid "+this.props.borderColor,
		},
		clearButton: {
			width: "50%",
			backgroundColor: this.props.buttonBackgroundColor,
		  border: "1px solid",
			borderColor: this.props.borderColor,
		  borderBottom: "0",
		  margin: "auto",
		  display: "block",
		  float: "left",
			color: this.props.buttonTextColor,
			padding: 5

		},
		saveButton: {
			width: "50%",
			backgroundColor: this.props.buttonBackgroundColor,
		  border: "1px solid",
			borderColor: this.props.borderColor,
		  borderBottom: "0",
		  margin: "auto",
		  display: "block",
		  float: "right",
			color: this.props.buttonTextColor,
			padding: 5
		}
	}//)
	 state = { trimmedDataURL: null, height: this.props._height, width: this.props._width, buttonHeight: 0 }

	 constructor(props){
		 super(props);
		 this.viewRef = React.createRef()
	 }
	 sigPad = {}

	 clear = () => {
		 this.sigPad.clear()
	 }

	 trim = () => {
		 let imgStuff = this.sigPad.getTrimmedCanvas().toDataURL('image/png')
		 this.setState({ trimmedDataURL: imgStuff })
		 const {imageOutputAction} = this.props;
			if(imageOutputAction) imageOutputAction(imgStuff)
			this.clear()
	 }
	 componentDidMount = () => {
		 const height = this.viewRef.clientHeight;
		 const width = this.viewRef.clientWidth;
		 this.setState({componentHeight: this.props._height, componentWidth: this.props._width})

	 }
	render = () => {
		const { backgroundColor, penColor, borderColor, buttonTextColor, buttonBackgroundColor} = this.props
		const { trimmedDataURL } = this.state



		const buttonHeight = 32;
		const sigHeight = this.props._height - buttonHeight;


		return (
			<View
				ref={this.viewRef}
				style={this.styles.wrapper}
				key={`view.${this.state._height+this.state._width}`}
				>
				<div>
						<SignatureCanvas
							penColor= {this.props.penColor}
							ref={(ref) => { this.sigPad = ref }}
				 			canvasProps={{width: this.props._width, height: sigHeight, className: 'sigCanvas'}}
							key={`sigCanvas.${this.props.backgroundColor+this.props.penColor}`}
				 		/>
				</div>
				<div style={this.styles.div} className="button-div">
        	<button
						style={this.styles.clearButton}
						className="clear-btn"
						onClick={this.clear}
						key={`clearButton.${this.props.buttonBackgroundColor+this.props.buttonTextColor}`}>
          	{this.props.clearText}
        	</button>
        	<button style={this.styles.saveButton} className="save-btn" onClick={this.trim}>
          	{this.props.saveText}
        	</button>
      	</div>

			</View>

		)
	}
}


export default ReactSig
