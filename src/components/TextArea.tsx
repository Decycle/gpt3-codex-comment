import CodeMirror from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'

type TextType = 'input' | 'output'

const TextArea = ({
  value,
  setValue,
  type,
}: {
  value: string
  setValue: (input: string) => void
  type: TextType
}) => {
  return (
    <CodeMirror
      value={value}
      extensions={[cpp()]}
      theme='dark'
      width='1000px'
      onChange={(value) => {
        localStorage.setItem(type, value)
        setValue(value)
      }}
    />
  )
}

export default TextArea
