import { CommonComponentProps } from '../../interface';


const Box = (props: CommonComponentProps) => {
  return (
    <div>{props.children}</div>
  )
}

export default (Box);