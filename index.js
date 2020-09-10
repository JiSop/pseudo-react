/* @jsx createElement */

function renderElement(node) {
  // 방어 코드
  // 가장 하위 요소는 문자열이 된다.
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.type);

  // 자식 요소 렌더링
  node.children.map(renderElement).forEach((element) => {
    el.appendChild(element);
  });

  return el;
}

function render(vdom, container) {
  // 여기에 기존 버추얼 돔과 비교하는 로직이 들어온다
  container.appendChild(renderElement(vdom));
}

// 바벨리 트렌스 파일링 할때 jsx 형태로 바뀜
// 컴파일 타임에 일어남
function createElement(type, props = {}, ...children) {
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children };
}

function Row(props) {
  return <li>{props.label}</li>;
}

function List(props) {
  return (
    <ul>
      <Row label="핫챠" />
      <li>React</li>
      <li>Redux</li>
      <li>TypeScript</li>
    </ul>
  );
}

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <List />
    </div>
  );
}

render(<App />, document.getElementById("root"));
console.log(<App />);
