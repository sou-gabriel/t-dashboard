import { Image } from 'antd';

type Props = {
  image: string;
  alt: string;
};

export default function GalleryTab({ image, alt }: Props) {
  return <Image className="w-96 rounded-md" src={image} alt={alt} />;
}
