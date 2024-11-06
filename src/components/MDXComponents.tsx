import { Embed } from './blog/Embed'
import Image from 'next/image'

export const MDXComponents = {
  // Override default components
  img: (props: any) => (
    <div className="my-8">
      <Image
        {...props}
        alt={props.alt || ''}
        className="rounded-lg"
        width={700}
        height={400}
      />
    </div>
  ),
  Embed: Embed,
}

export default MDXComponents 