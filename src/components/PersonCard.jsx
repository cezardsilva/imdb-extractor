export default function PersonCard({ person, character }) {
  return (
    <div className="person-card">
      <img
        src={
          person.avatars?.[0]?.url ||
          "https://via.placeholder.com/80x80?text=No+Image"
        }
        alt={person.display_name}
      />
      <div className="person-name">{person.display_name}</div>
      {character && <div className="person-character">{character}</div>}
    </div>
  );
}
