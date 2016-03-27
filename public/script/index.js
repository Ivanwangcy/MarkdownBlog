var NoteList = React.createClass({
  render: function() {
    return <ul></ul>;
  }
});


/**
 * React 实例化组件不是真实的DOM节点
 * 自定义组件以大写字母开头 -- while custom React component names begin with an uppercase letter.
 */
var NoteBox = React.createClass({
    render: function() {
      return (
        // JSX raw format -- React.createElement('div', {className: 'noteBox'}, 'Hello world!');
        <div className="noteBox">
          <h1>Ivan’s Note</h1>
          Hello, world! I am a NoteBox.
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
  <NoteBox />, // of raw React.createElement(NoteBox, null);
  document.getElementById("content")
);
