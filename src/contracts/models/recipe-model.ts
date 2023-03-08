import { IngredientModel } from './ingredient-model';

export class RecipeModel {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: IngredientModel[];

  /**
   * @param name {string} - The name of the recipe
   * @param description {string} - The description of the recipe
   * @param imagePath {string} - The image path of the recipe
   * @param ingredients {IngredientModel[]} - The ingredients of the recipe
   */
  constructor(
    name: string,
    desc: string,
    imagePath: string,
    ingredients: IngredientModel[]
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
