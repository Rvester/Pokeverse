import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PokemonList from "./pokeVerse";

describe("PokemonList Component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("renders the component", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      })
    );

    render(<PokemonList />);

    expect(
      screen.getByPlaceholderText("Search Pokémon...")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Pokédex | Original 151")
    ).toBeInTheDocument();
  });

  it("filters Pokémon based on search input", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      })
    );

    render(<PokemonList />);

    fireEvent.change(screen.getByPlaceholderText("Search Pokémon..."), {
      target: { value: "bulbasaur" },
    });

    expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
    expect(screen.queryByText("ivysaur")).not.toBeInTheDocument();
  });

  it("adds and removes Pokémon from the squad", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      })
    );

    render(<PokemonList />);

    const bulbasaurAddButton = await screen.findByText("Add to Squad");
    fireEvent.click(bulbasaurAddButton);

    expect(screen.getByText("Remove")).toBeInTheDocument();

    const bulbasaurRemoveButton = screen.getByText("Remove");
    fireEvent.click(bulbasaurRemoveButton);

    expect(screen.getByText("Add to Squad")).toBeInTheDocument();
  });

  it("enables and disables the Battle button based on squad size", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      })
    );

    render(<PokemonList />);

    const battleButton = screen.getByText("Battle");
    expect(battleButton).toBeDisabled();

    const bulbasaurAddButton = await screen.findByText("Add to Squad");
    fireEvent.click(bulbasaurAddButton);

    const ivysaurAddButton = await screen.findByText("Add to Squad");
    fireEvent.click(ivysaurAddButton);

    expect(battleButton).toBeEnabled();
  });
});
