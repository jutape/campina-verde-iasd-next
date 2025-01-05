"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
    date: z.date({
        required_error: "A data é obrigatória.",
    }),
    category: z.enum(["pregador", "mensagem musical inicial", "musica inicial", "musica tema", "mensagem musical final"], {
        errorMap: () => ({ message: "Selecione uma categoria válida." }),
    }),
    personName: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
});

export default function ProfileForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: undefined,
            category: "pregador",
            personName: "",
        },
    });

    const onSubmit = (values: any) => {
        console.log(values);
        // Lógica de envio do formulário
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={"flex flex-col gap-6"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Campo de Data */}
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Data do evento</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, 'dd/MM/yyyy')
                                                        ) : (
                                                            <span>Selecione uma data</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {/* <FormDescription>
                                            Your date of birth is used to calculate your age.
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Campo de Categoria */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione uma categoria" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pregador">Pregador</SelectItem>
                                                    <SelectItem value="mensagem musical inicial">
                                                        Mensagem Musical Inicial
                                                    </SelectItem>
                                                    <SelectItem value="musica inicial">Música Inicial</SelectItem>
                                                    <SelectItem value="musica tema">Música Tema</SelectItem>
                                                    <SelectItem value="mensagem musical final">
                                                        Mensagem Musical Final
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Campo Nome da Pessoa */}
                            <FormField
                                control={form.control}
                                name="personName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome da Pessoa</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome da pessoa" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>

    );
}
