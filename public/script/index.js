var NoteList = React.createClass({
  render: function() {
    return <ul></ul>;
  }
});

var NoteBox = React.createClass({
    render: function() {
      return <div className="NoteBox">
        <h1>Note</h1>
      </div>;
    }
});


ReactDOM.render(<NoteBox/>, document.getElementById("content"));
