import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { MatchFormComponent } from './components/match-form/match-form.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from './components/matches/matches.component';
import { PlayerComponent } from './components/player/player.component';
import { TeamsComponent } from './components/teams/teams.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { SearchMatchComponent } from './components/search-match/search-match.component';
import { AddStaduimComponent } from './components/add-staduim/add-staduim.component';
import { WeatherComponent } from './components/weather/weather.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes: Routes = [{path:"", component:HomeComponent},
{path:"login", component:LoginComponent},
{path:"singup", component:SingupComponent},
{path:"playerform", component:PlayerFormComponent},
{path:"matchform", component:MatchFormComponent},

{path:"editMatchForm/:id", component:MatchFormComponent},
{path:"allMatches/search", component:MatchesComponent},
{path:"editPlayer/:id", component:PlayerFormComponent},

{path:"addteam",component:AddTeamComponent},
{path:"editteam", component:EditTeamComponent},
{path:"allMatches", component:MatchesComponent},
{path:"allPlayers", component:PlayerComponent},
{path:"allTeams", component:TeamsComponent},
{path:"admin", component:AdminComponent},
{path:"matchInfo/:id", component: MatchInfoComponent},
{path:"search-match", component: SearchMatchComponent},
{path:"addstaduim", component:AddStaduimComponent},
{path:"weather", component:WeatherComponent},
{path:"signup",component:SignUpComponent},
{path:"signin", component:SignInComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
