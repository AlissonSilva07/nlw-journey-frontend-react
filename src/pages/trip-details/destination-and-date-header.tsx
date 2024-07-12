import { MapPin, Calendar, Settings2, X, ArrowRight } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  const [destination, setDestination] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange>()

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const [editMode, setEditMode] = useState<boolean>(false)

  const handleOpenEditMode = () => {
    setEditMode(true)
  }

  const handleCloseEditMode = () => {
    setEditMode(false)
  }

  async function updateTrip() {

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    console.log(destination, eventStartAndEndDates.from, eventStartAndEndDates.to)

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to,
    })
    
    window.document.location.reload()
  }

  useEffect(() => {
    api.get(`trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  const displayedDateBefore = trip ? format(trip.starts_at, "d' de 'LLL").concat(' até ').concat(format(trip.ends_at, "d' de 'LLL"))
    : null
  
  const displayedDateAfter = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
    ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL", { locale: ptBR }))
    : null

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      {editMode == false ? (
        <>
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-zinc-400" />
            <span className="text-zinc-100">{trip?.destination}</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <span className="text-zinc-100">{displayedDateBefore}</span>
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            <Button onClick={handleOpenEditMode} variant="secondary">
              Alterar local/data
              <Settings2 className="size-5" />
            </Button>
          </div>
        </>
      )
        : (
          <>
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Para onde você vai?"
                className="bg-transparent placeholder-zinc-400 outline-none flex-1"
                onChange={event => setDestination(event.target.value)}
              />
            </div>

            <button onClick={openDatePicker} className="flex items-center gap-2 text-left w-[240px]">
              <Calendar className="size-5 text-zinc-400" />
              <span
                className="text-zinc-400 w-40 flex-1"
              >
                {displayedDateAfter || 'Quando'}
              </span>
            </button>

            {isDatePickerOpen && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="font-lg font-semibold">Selecione a data</h2>
                      <button>
                        <X className="size-5 text-zinc-400" onClick={closeDatePicker} />
                      </button>
                    </div>
                  </div>

                  <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                </div>
              </div>
            )}

            <div className="w-px h-6 bg-zinc-800" />


            <div className="flex items-center gap-2">
              <Button onClick={handleCloseEditMode} variant="secondary">
                <X className="size-5" />
              </Button>
              <Button onClick={updateTrip} variant="primary">
                Confirmar
                <ArrowRight className="size-5" />
              </Button>

            </div>
          </>
        )
      }
    </div >
  )
}