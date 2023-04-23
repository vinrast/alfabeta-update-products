import EventEmitter from 'stream';
export class EventEmitterService {
  private emitter: EventEmitter;

  private static instance: { [key: string]: EventEmitterService } = {};
  private constructor() {
    this.emitter = new EventEmitter();
  }

  public static getInstance(id: string): EventEmitterService {
    if (!EventEmitterService.instance[id]) {
      EventEmitterService.instance[id] = new EventEmitterService();
    }
    return EventEmitterService.instance[id];
  }

  public sendEvent(topic: string, data: any) {
    this.emitter.emit(topic, data);
  }

  public listenEvent(topic: string, callback: Function) {
    this.emitter.on(topic, (data: any) => callback(data));
  }
}
