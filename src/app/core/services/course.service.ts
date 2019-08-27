import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Course, Section, Subject, Content, Test, Question, Courses, Contents, Option } from '../models';
import { Questions } from '../models/questions';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private redAppleUrl = 'http://localhost:5000/'; //URL to web api. 

  constructor(private http: HttpClient, private router: Router) { }

  createCourse(gameName: string, gameDescription: string) {
    return this.http.post<Course>(this.redAppleUrl + 'game/create', {
      game_name: gameName,
      game_description: gameDescription
    });
  }

  getCourse(courseId: number) {
    return this.http.get<Course>(this.redAppleUrl + 'game/' + courseId);
  }

  getCourseByUserId() {
    return this.http.get<Courses>(this.redAppleUrl + 'games/user');
  }
  
  getCourses() {
    return this.http.get<Courses>(this.redAppleUrl + 'games');
  }

  updateCourse(courseId: number, gameName: string, levels: Array<Section>) {
    return this.http.put<Course>(this.redAppleUrl + 'game/' + courseId, {
      game_name: gameName,
      levels: levels
    });
  }

  deleteCourse(courseId: number) {
    return this.http.delete<Course>(this.redAppleUrl + 'game/' + courseId);
  }

  createSection(sectionName: string, description: string, contents: any) {
    return this.http.post<Section>(this.redAppleUrl + 'level/create', {
      level_name: sectionName,
      level_description: description,
      contents: contents
    });
  }

  getSection(sectionId: number) {
    return this.http.get<Section>(this.redAppleUrl + 'level/' + sectionId);
  }

  updateSection(sectionId: number, sectionName: string, levelDescription, contents: Array<Contents>) {
    return this.http.put<Section>(this.redAppleUrl + 'level/' + sectionId, {
      level_name: sectionName,
      level_description:levelDescription,
      contents: contents
    });
  }

  deleteSection(sectionId: number) {
    return this.http.delete<Section>(this.redAppleUrl + 'level/' + sectionId);
  }

  createSubject(subjectName: string, parentId: number) {
    return this.http.post<Subject>(this.redAppleUrl + 'subject/register', {
      parent_id: parentId,
      subject_name: subjectName
    });
  }

  getSubjects() {
    return this.http.get<Subject>(this.redAppleUrl + 'subjects');
  }

  createContent(subjectId: number, contentName: string, content: string) {
    return this.http.post<Contents>(this.redAppleUrl + 'content/create', {
      subject_id: subjectId,
      content_name: contentName,
      content: content
    });
  }
  updateContent(contentId:number,subjectId: number, contentName: string, content: string){
    return this.http.put<Contents>(this.redAppleUrl + 'content/' + contentId,{
      content : content,
      content_name: contentName,
      subject_id: subjectId
    })
  }
  getContentBySubject(subjectId: number) {
    return this.http.get<Subject>(this.redAppleUrl + 'contentbysubject/' + subjectId);
  }

  getContent(contentId: number) {
    return this.http.get<Content>(this.redAppleUrl + 'content/' + contentId);
  }

  createQuiz(quizName: string) {
    return this.http.post<Contents>(this.redAppleUrl + 'test/create', {
      test_name: quizName
    });
  }

  updateQuiz(quizId:number, quizName: string, questions: Array<Question>) {
    return this.http.put<Contents>(this.redAppleUrl + 'test/'+ quizId, {
      test_name: quizName,
      questions: questions
    });
  }

  getQuiz(quizId: number) {
    return this.http.get<Contents>(this.redAppleUrl + 'test/' + quizId);
  }
  createQuestion(qcode: string, qsubjectId: number, qquest: string, optionsArray: Array<Option>){
    return this.http.post<Question>(this.redAppleUrl + 'question/create', {
      code : qcode,
      subject_id: qsubjectId,
      question: qquest,
      options: optionsArray
    });
  }
  updateQuestion(quId:number, qcode: string, qsubjectId: number, qquest: string, optionsArray: Array<Option>){
    return this.http.put<Question>(this.redAppleUrl + 'question/' + quId, {
      code : qcode,
      subject_id: qsubjectId,
      question: qquest,
      options: optionsArray
    });
  }
  getQuestion(quId:number){
    return this.http.get<Question>(this.redAppleUrl+'question/'+ quId);
  }
  getAllQuestions(){
    return this.http.get<Questions>(this.redAppleUrl+'questions');
  }
  getUserQuestions(){
    return this.http.get<Questions>(this.redAppleUrl+'questions/user');
  }
}
