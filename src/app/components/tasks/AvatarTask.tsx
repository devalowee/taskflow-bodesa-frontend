export const AvatarTask = ({ name, avatar }: { name: string, avatar: string }) => {
  return (
    <div className="flex items-center gap-2">
      <img src={avatar} alt={name} className="size-8 rounded-full" />
      <p>{name}</p>
    </div>
  )
}
