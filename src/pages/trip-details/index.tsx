import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { CreateImportantLinkModal } from "./create-important-link-modal";
import { CreateGuestsModal } from "./create-guests-modal.";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  const [isCreateImportantLinkModalOpen, setIsCreateImportantLinkModalOpen] = useState(false)

  function openCreateImportantLinkModal() {
    setIsCreateImportantLinkModalOpen(true)
  }

  function closeCreateImportantLinkModal() {
    setIsCreateImportantLinkModalOpen(false)
  }

  const [isCreateGuestsModalOpen, setIsCreateGuestsModalOpen] = useState(false)

  function openCreateGuestsModal() {
    setIsCreateGuestsModalOpen(true)
  }

  function closeCreateGuestsModal() {
    setIsCreateGuestsModalOpen(false)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <button onClick={openCreateActivityModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks openCreateImportantLinkModal={openCreateImportantLinkModal} />

          <div className="w-full h-px bg-zinc-800" />

          <Guests openCreateGuestsModal={openCreateGuestsModal} />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      {isCreateImportantLinkModalOpen && (
        <CreateImportantLinkModal
          closeCreateImportantLinkModal={closeCreateImportantLinkModal}
        />
      )}

      {isCreateGuestsModalOpen && (
        <CreateGuestsModal
          closeCreateGuestsModal={closeCreateGuestsModal}
        />
      )}
    </div>
  )
}