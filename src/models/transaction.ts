import crypto from "crypto";

export class Transaction {
  private _id: string;
  get id(): string {
    return this._id;
  }

  private _title: string;
  get title(): string {
    return this._title;
  }
  private _value: number;
  get value(): number {
    return this._value;
  }
  private _type: "income" | "outcome";
  get type(): string {
    return this._type;
  }

  // constructor(title: string, value: number, type: "income" | "outcome") {
  //   this._id = crypto.randomUUID();
  //   this._title = title;
  //   this._value = value;
  //   this._type = type;
  // }

  constructor(title: string, value: number, type: "income" | "outcome") {
    if (!title) throw new Error("Tipo da transação inválido");

    if (!value || isNaN(value)) throw new Error("Valor inválido");

    if (!["income", "outcome"].some((t) => t === type)) {
      throw new Error("Tipo inválido. Valores permitidos: income ou outcome");
    }
    this._id = crypto.randomUUID();

    this._title = title;
    this._value = value;
    this._type = type;
  }

  updateTransaction(title: string, value: number, type: "income" | "outcome") {
    this._title = title;
    this._value = value;
    this._type = type;
  }

  toJson() {
    return {
      id: this._id,
      title: this._title,
      value: this._value,
      type: this._type,
    };
  }
}
