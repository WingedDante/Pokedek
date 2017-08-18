import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../shared/pokemon';
import {PokemonService} from '../shared/pokemon.service';
import {Router} from '@angular/router'
@Component({
    moduleId: module.id,
    templateUrl: 'add-pokemon.template.html'
})

export class AddPokemonComponent{
    formPokemon: any = {};
    cardTitle: string = "Add Pokemon";
    errorMessage: string;

    constructor(private _pokemonService: PokemonService, private router: Router){

    }

    savePokemon(formValues: any){
        //console.log(formValues);
        this._pokemonService.addPokemon(formValues)
        .subscribe(
            res => {
                console.log('pokemon saved');
                this.router.navigate(['/']);
            });
    }


}