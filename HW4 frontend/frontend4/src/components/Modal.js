import React from "react";

// We would like to use a modal (small window) to show details of a task.
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

// Let's create a component.
// We are creating and exporting the CustomModal class. It is a class component.
// It will be imported in our App.js.
export default class CustomModal extends React.Component {
  // The constructor function will be called when the component gets initialized.
  // It is also the place where you initialize the component's properties,
  // aka props (that is, function arguments in React-speak).
  constructor(props) {
    // `super()` allows us to inherit from the parent component's constructor.
    // That will allow our component to access all built-in React functions, etc.
    super(props);
    // React components have a built-in `state` object. The `state` object is where
    // you store property values that belong to the component. When the state object
    // changes, the component re-renders.
    // The state object is initialized in the constructor.
    // It can contain as many properties as you like.
    // Here we define one property called activeItem.
    // 'this' refers to the currently instantiated CustomModal.
    this.state = {
      songItem: this.props.songItem,
    };
  }

  // Whenver we enter changes into our form, e.g., for the title of our task,
  // we want the change to be immediately detected. This is what happens when
  // the handleChange function is called below with onChange={this.handleChange}.
  // handleChange takes an event argument, i.e., a change in title, descripton,
  // or checkbox.
  handleChange = (event) => {
    // An event has a target, and event.target gives us the event's DOM element, e.g., see further below
    // <input name="description" placeholder="Enter Todo description" type="text" class="form-control" value="My Task">.
    // To refer to the description we assign the variable name = "description" and value = "My Task".
    let { name, value } = event.target;
    // if (event.target.type === "checkbox") {
    //   value = event.target.checked;
    // }
    // Below we have the spread operator three dots ... . It works as follows:
    // var parts = ['two', 'three']; // [two", "three"]
    // var numbers = ['one', ...parts, 'four']; // ["one", "two", "three", "four"]
    // ...this.state.activeItem spreads out the current task object, e.g.,
    // {"id": 3, "title": "My Task", "description": "Wash Dishes", "completed": true}.
    // [name]: value sets the name of the task to the new value the user entered
    // (e.g., title to "Another Task" or description to "Sweep floor").
    const songItem = { ...this.state.songItem, [name]: value };
    // To change a value in the `state` object for rendering, use the `setState()`
    // method (on the current CustomModal instance referred to with `this`).
    // If you would not do so, the text shown to the user in the textbox, e.g.,
    // for the title of the new task would not change.
    this.setState({ songItem });
  };
  // The `render()` method is the only required method in a class component.
  // When called, it will render the page. You do not have to specifically
  // call render() in your component. Rather, the stub code with the
  // ReactDOM.render(...) in your index.js will do that for you.
  // The following will render the modal for adding or editing a task.
  render() {
    // The modal has three properties: toggle, onSave, and activeItem.
    // We have already defined activeItem above.
    // See App.js on how toggle, onSave, and activeItem are being used.
    const { toggle, onSave } = this.props;

    return (
      // isOpen={true} is a Boolean describing if the modal should be shown or not,
      // i.e., in our case, what should happen if the modal is open.
      // Open the modal on toggling/clicking. See the toggle function in App.js
      // below.
      <Modal isOpen={true} toggle={toggle} >
        <ModalHeader toggle={toggle}> Enter a Song </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="song">Title </Label>
              <Input
                type="text"
                name="song"
                value={this.state.songItem.song}
                // "this" refers to the current event. If there is a change,
                // it will be passed to the handleChange function above.
                onChange={this.handleChange}
                placeholder="Enter Song"
              />
            </FormGroup>
            <FormGroup>
              <Label for="artist">Artist </Label>
              <Input
                type="text"
                name="artist"
                value={this.state.songItem.artist}
                onChange={this.handleChange}
                placeholder="Enter Artist"
              />
            </FormGroup>
            
            <FormGroup>
              <Label for="rating">Rating </Label>
              <select name="rating" onChange ={this.handleChange}>
              <option value='0'> 0 </option>
              <option value='1'> 1 </option>
              <option value='2'> 2 </option>
              <option value='3'> 3 </option>
              <option value='4'> 4 </option>
              <option value='5'> 5 </option>
              </select>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.songItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }


}
