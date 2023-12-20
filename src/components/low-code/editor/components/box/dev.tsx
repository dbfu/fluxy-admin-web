import { CommonComponentProps } from '../../interface';

const Box = ({ _id, children }: CommonComponentProps) => {
  return (
    <div data-component-id={_id}>{children}</div>
  )
}

export default (Box);