import { useState, useCallback,useMemo } from "react";
import { ChildArea } from "./ChildArea";
import "./styles.css";

export default function App() {
  console.log("App");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const onChangeText = (e) => setText(e.target.value);
  const onClickOpen = () => setOpen(!open);
  // // アロー関数で渡した関数は毎回新しい（別物の）関数を渡した。とみなされるそうです。
  // // これを子コンポーネントに渡しているので、毎回propsの中身が変更されているという扱いになる
  // // --> memo の意味がなくなってしまう。
  // const onClickClose = () => setOpen(false);
  // これに対応するには、　useCallbackで一度生成されたものを使い回すよう指定する。
  // []にはuseEffectと同様に変更を監視する対象の値をセットすれば良い
  const onClickClose = useCallback(() => setOpen(false), [setOpen]);

  // 変数に対するmemo機能。そんなに使うケースはなさそう。
  const temp = useMemo(() =>1+3,[]);
  console.log(temp);

  return (
    <div className="App">
      <input value={text} onChange={onChangeText} />
      <br />
      <br />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} onClickClose={onClickClose} />
    </div>
  );
}
