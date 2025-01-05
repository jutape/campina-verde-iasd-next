'use client'
import { Church } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";


export default function LoginPage() {

    const onSubmitFunction = (e: any) => {
        e.preventDefault()
        location.href = '/event/create'
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={"flex flex-col gap-6"}>
                    <form onSubmit={onSubmitFunction}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <a
                                    href="/"
                                    className="flex flex-col items-center gap-2 font-medium"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                        <Church className="size-6" />
                                    </div>
                                    <span className="sr-only">Igreja Adventista do Sétimo Dia Campina Verde</span>
                                </a>
                                <h1 className="text-xl font-bold">Sistema de gestão Campina Verde</h1>
                                <div className="text-center text-sm">
                                    Não possui um acesso?{" "}
                                    <a href="https://wa.me/5511946744553?text=Olá!%20Gostaria%20de%20solicitar%20o%20acesso%20para%20gerenciar%20o%20ministério.%20Ainda%20não%20possuo%20um%20login%20ou%20credenciais.%20Poderia%20me%20orientar%20sobre%20os%20próximos%20passos?" className="underline underline-offset-4">
                                        Cadastre-se
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@exemplo.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="**********"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Entrar
                                </Button>
                            </div>
                        </div>
                    </form>
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                        O acesso ao sistema deve ser solicitado ao gestor ou diretor do grupo para aprovação prévia.
                    </div>
                </div>
            </div>
        </div>
    )
}
