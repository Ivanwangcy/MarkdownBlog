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
  getInitialState: function(){
    return {author: '', text: ''};
  },
  handleAuthorChange: function(event) {
    this.setState({author: event.target.value});
  },
  handleTextChange: function(event) {
    this.setState({text: event.target.value});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if(!author || !text) return;

    this.props.onNoteSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="noteForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}/>
        <textarea type="text" placeholder="Write something..."
          value={this.state.text}
          onChange={this.handleTextChange}/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

/**
 * React 实例化组件不是真实的DOM节点
 * 自定义组件以大写字母开头 -- while custom React component names begin with an uppercase letter.
 */
var NoteBox = React.createClass({
    loadNotesFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    handleNoteSubmit: function(note){
      var notes = this.state.data;

      note.id = Date.now();
      var newNotes = notes.concat([note]);
      this.setState({data: newNotes});
      // TODO:
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: note,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({data: notes});
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      })
    },
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      this.loadNotesFromServer();
      setInterval(this.loadNotesFromServer, this.props.pollInterval);
    },
    render: function() {
      return (
        // composing components
        <div className="noteBox">
          <h1>Ivan’s Note</h1>
          <NoteList data={this.state.data}/>
          <NoteForm onNoteSubmit={this.handleNoteSubmit}/>
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
  <NoteBox url="/api/notes" pollInterval={2000}/>, // of raw React.createElement(NoteBox, null);
  document.getElementById("content")
);
