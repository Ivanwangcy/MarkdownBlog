var Note = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return {__html: rawMarkup};
  },
  render: function() {
    return (
      <div className="note">
        <h2 className="noteAuthor">{this.props.author}</h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    );
  }
});

var NoteList = React.createClass({

  render: function() {
    var noteNodes = this.props.data.map(function(note) {
      return (
        <Note author={note.author} key={note.id}>
          {note.text}
        </Note>
      );
    });
    return (
      <div className="noteList">
        {noteNodes}
      </div>
    );
  }
});

var NoteForm = React.createClass({
  render: function() {
    return (
      <div className="noteForm">
        Hello, world! I am a NoteForm.
      </div>
    );
  }
});

/**
 * React 实例化组件不是真实的DOM节点
 * 自定义组件以大写字母开头 -- while custom React component names begin with an uppercase letter.
 */
var NoteBox = React.createClass({
    render: function() {
      return (
        // composing components
        <div className="noteBox">
          <h1>Ivan’s Note</h1>
          <NoteList data={this.props.data}/>
          <NoteForm />
        </div>
      );
    }
});


/**
 * [render 渲染页面]
 * @param  {[type]} [笔记框 NoteBox Component]
 * @param  {[type]} [添加到Dom节点]
 * @return {[type]} [none]
 */
ReactDOM.render(
  <NoteBox url="/api/notes"/>, // of raw React.createElement(NoteBox, null);
  document.getElementById("content")
);
