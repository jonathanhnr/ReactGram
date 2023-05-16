import * as Avatar from '@radix-ui/react-avatar';
import "./Avatar.css"

export default ({size = 'P', src, border}) => (
  <Avatar.Root className={`AvatarRoot ${`Avatar-${size.toUpperCase()}`} ${border && "Avatar-border"}`}>
    <Avatar.Image
    className={"AvatarImage"}
    src={src}
    alt={"photo-user"}
    />
    <Avatar.Fallback className="AvatarFallback" delayMs={600}>
      JD
    </Avatar.Fallback>
  </Avatar.Root>
);