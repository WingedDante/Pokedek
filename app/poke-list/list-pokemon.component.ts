import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../shared/pokemon';
import {PokemonService} from '../shared/pokemon.service';

@Component({
    moduleId: module.id,
    selector: 'pk-list',
    templateUrl: 'list-pokemon.template.html'
})

export class ListPokemonComponent implements OnInit{
    pokemon: Pokemon[];
    errorMessage: string;

    constructor(private _pokemonService: PokemonService){

    }

    ngOnInit(){
        //get all pokemon
        this.getPokemon();
    }

    getPokemon(){
        this._pokemonService.getPokemon()
        .subscribe(
            (pokemon: Pokemon[])=>{
                console.log(pokemon);
                this.pokemon = pokemon;
                //this fixes issues with no types in the type array
                this.pokemon.forEach(element => {
                    
                    if (element.type == null){
                        element.type = ['none'];
                    }
                    if (element.image == null){
                        element.image = 'app/shared/images/abra.jpg';
                    }
                });
            },
            error => this.errorMessage = <any> error
        );
    }

    deletePokemon(pokemon: Pokemon){
        this._pokemonService.deletePokemon(pokemon)
            .subscribe(
                () => {},
                error => this.errorMessage = <any> error,
                () => {
                    this.getPokemon();
                }
            );
    }
}