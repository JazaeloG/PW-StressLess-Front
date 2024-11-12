import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/interfaces/mensaje.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  messages: Message[] = [];
  userInput: string = '';

  sendMessage() {
    if (this.userInput.trim()) {
      // Agrega el mensaje del usuario
      this.messages.push({ text: this.userInput, sender: 'user' });
      // Procesa la respuesta del chatbot
      this.chatbotReply(this.userInput);
      // Limpia el input
      this.userInput = '';
    }
  }

  chatbotReply(userMessage: string) {
    // Simulación de respuesta del chatbot
    const reply = 'Respuesta del chatbot al mensaje: ' + userMessage;
    this.messages.push({ text: reply, sender: 'chatbot' });
  }

  returnToHome(){
    this.router.navigate(['/home'])
  }
}