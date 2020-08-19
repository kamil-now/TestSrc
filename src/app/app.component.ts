import { Component } from '@angular/core';
import { SrcJSON } from './app.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'TestSrc';
  public showCorrectAnswers = false;
  public data: Src;
  private readonly initData: Src;

  constructor() {
    this.initData = JSON.parse(JSON.stringify(SrcJSON));
    this.initData.sets.forEach(set => set.numberOfQuestions = set.questions.length);
    this.reset();
  }

  public reset(): void {
    this.showCorrectAnswers = false;
    this.data = JSON.parse(JSON.stringify(this.initData));
  }

  public isChecked(question: Question, selected: number): boolean {
    return selected === question.selected;
  }

  public check(question: Question, selected: number): void {
    question.selected = selected;
  }

  public getNumberOfCorrectAnswers(set: SrcSet): number {
    return set.questions.filter(x => x.selected === x.correct).length;
  }

  public random(): void {
    let setIndex = 0;
    this.data.sets.forEach(set => {
      const tmp = [...this.initData.sets[setIndex].questions];
      set.questions = [];
      let i: number;
      let random: number;
      for (i = 0; i < set.numberOfQuestions; i++) {
        random = this._getRandomInt(0, tmp.length);
        set.questions.push(tmp[random]);
        const index = tmp.indexOf(tmp[random]);
        tmp.splice(index, 1);
      }
      setIndex++;
    });
  }
  private _getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export class Src {
  sets: SrcSet[];
}
export class SrcSet {
  numberOfQuestions: number;
  title: string;
  questions: Question[];
}
export class Question {
  selected: number;
  text: string;
  answers: string[];
  correct: number;
}
