import { Mail, User, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateGuestsModalProps {
    closeCreateGuestsModal: () => void
}

export function CreateGuestsModal({
    closeCreateGuestsModal
}: CreateGuestsModalProps) {
    const { tripId } = useParams()


    async function createGuests(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const name = data.get('name')?.toString()
        const email = data.get('email')?.toString()
        const is_owner = false
        const is_confirmed = false

        await api.post(`/trips/${tripId}/participants`, {
            name,
            email,
            is_owner,
            is_confirmed
        })

        window.document.location.reload()
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="font-lg font-semibold">Cadastrar novo convidado(a)</h2>
                        <button>
                            <X className="size-5 text-zinc-400" onClick={closeCreateGuestsModal} />
                        </button>
                    </div>

                    <p className="text-sm text-zinc-400">
                        Todos convidados podem visualizar os demais convidados.
                    </p>
                </div>

                <form onSubmit={createGuests} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <User className="text-zinc-400 size-5" />
                        <input
                            name="name"
                            placeholder="Qual o nome do participante?"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        />
                    </div>

                    <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Mail className="text-zinc-400 size-5" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Qual o email do participante?"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        />
                    </div>

                    <Button size="full">
                        Salvar Convidado
                    </Button>
                </form>
            </div>
        </div>
    )
}