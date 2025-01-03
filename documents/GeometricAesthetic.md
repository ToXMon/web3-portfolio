Use sharp edges with no border radius for buttons.

.button {
  background-color: var(--accent-color);
  border: 2px solid var(--primary-color);
  border-radius: 0;
  padding: 10px 20px;
  color: var(--text-color);
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: var(--primary-color);
  color: var(--accent-color);
}