export default function Loading({
  size = 'xs',
}: {
  size?: 'xs' | 'sm' | 'lg'
}) {
  let variant
  switch (size) {
    case (size = 'sm'):
      variant = 'loading-sm'
      break
    case (size = 'lg'):
      variant = 'loading-lg'
      break
    default:
      variant = 'loading-xs'
      break
  }
  return <span className={`loading loading-spinner ${variant}`}></span>
}
