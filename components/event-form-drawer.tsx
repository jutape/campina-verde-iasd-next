"use client";

import React, { useState, useEffect } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EventItem } from "@/app/schedule";

export type QuestionType = {
    title: string;
    description: string;
    label: string;
    field: keyof EventItem;
    secondaryField?: keyof EventItem; // New field for additional info
    secondaryLabel?: string; // New label for additional info 
    sabbathOnly?: boolean;
};

export type EventFormDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (value: string, secondaryValue?: string) => void;
    activeQuestion?: QuestionType;
    initialValue?: string;
    initialSecondaryValue?: string;
};

export default function EventFormDrawer({
    isOpen,
    onClose,
    onSubmit,
    activeQuestion,
    initialValue = "",
    initialSecondaryValue = "",
}: EventFormDrawerProps) {
    const [inputValue, setInputValue] = useState(initialValue);
    const [secondaryInputValue, setSecondaryInputValue] = useState(initialSecondaryValue);

    useEffect(() => {
        if (isOpen) {
            setInputValue(initialValue);
            setSecondaryInputValue(initialSecondaryValue);
        }
    }, [isOpen, initialValue, initialSecondaryValue]);

    const handleSubmit = () => {
        onSubmit(inputValue, secondaryInputValue);
    };

    const hasSecondaryField = activeQuestion?.secondaryField && activeQuestion?.secondaryLabel;

    return (
        <Drawer 
            open={isOpen} 
            onOpenChange={(open) => !open && onClose()}
            modal={false}
        >
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{activeQuestion?.title || ""}</DrawerTitle>
                        <DrawerDescription>{activeQuestion?.description || ""}</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 py-2 space-y-4">
                        <div>
                            <Label htmlFor={String(activeQuestion?.field || "")}>
                                {activeQuestion?.label || ""}
                            </Label>
                            <Input
                                id={String(activeQuestion?.field || "")}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="mt-2"
                                autoFocus
                            />
                        </div>
                        
                        {hasSecondaryField && (
                            <div>
                                <Label htmlFor={String(activeQuestion?.secondaryField || "")}>
                                    {activeQuestion?.secondaryLabel || ""}
                                </Label>
                                <Input
                                    id={String(activeQuestion?.secondaryField || "")}
                                    value={secondaryInputValue}
                                    onChange={(e) => setSecondaryInputValue(e.target.value)}
                                    className="mt-2"
                                    placeholder="(Opcional)"
                                />
                            </div>
                        )}
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleSubmit}>Confirmar</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export const eventQuestions: Record<string, QuestionType> = {
    begin: {
        title: "Informações sobre o pregador",
        description: "Informe o nome do orador ou pregador responsável e o tema do sermão",
        field: "prayer",
        label: "Nome do orador",
        secondaryField: "sermonTheme",
        secondaryLabel: "Tema do sermão (opcional)"
    },
    initialHymn: {
        title: "Hino inicial",
        description: "Qual hino será cantado no início?",
        field: "initialHymn",
        label: "Nome do hino"
    },
    standingHymn: {
        title: "Hino em pé",
        description: "Qual hino será cantado em pé?",
        field: "standingHymn",
        label: "Nome do hino"
    },
    initialMusicalMessage: {
        title: "Mensagem musical inicial",
        description: "Informações sobre a mensagem musical inicial",
        field: "initialMusicalMessage",
        label: "Nome da mensagem musical (opcional)",
        secondaryField: "initialMusicalMessagePerformer",
        secondaryLabel: "Nome do(a) cantor(a)/músico(a)"
    },
    finalMusicalMessage: {
        title: "Mensagem musical final",
        description: "Informações sobre a mensagem musical final",
        field: "finalMusicalMessage",
        label: "Nome da mensagem musical (opcional)",
        secondaryField: "finalMusicalMessagePerformer",
        secondaryLabel: "Nome do(a) cantor(a)/músico(a)"
    },
    finalHymn: {
        title: "Hino final",
        description: "Qual hino será cantado no final?",
        field: "finalHymn",
        label: "Nome do hino"
    },
    // Sabbath school fields
    sabbathSchoolHymn: {
        title: "Hino da revista da Escola Sabatina",
        description: "Qual hino da revista será cantado?",
        field: "sabbathSchoolHymn",
        label: "Nome do hino",
        sabbathOnly: true
    },
    sabbathSchoolAdultTeacher: {
        title: "Professor da Escola Sabatina Adulto",
        description: "Quem será o professor da classe de adultos?",
        field: "sabbathSchoolAdultTeacher",
        label: "Nome do professor",
        sabbathOnly: true
    },
    sabbathSchoolYouthTeacher: {
        title: "Professor da Escola Sabatina Jovem",
        description: "Quem será o professor da classe de jovens?",
        field: "sabbathSchoolYouthTeacher",
        label: "Nome do professor",
        sabbathOnly: true
    },
    sabbathSchoolMusicalMessage: {
        title: "Mensagem musical da Escola Sabatina",
        description: "Informações sobre a mensagem musical na Escola Sabatina",
        field: "sabbathSchoolMusicalMessage",
        label: "Nome da mensagem musical (opcional)",
        secondaryField: "sabbathSchoolMusicalMessagePerformer",
        secondaryLabel: "Nome do(a) cantor(a)/músico(a)",
        sabbathOnly: true
    },
    // Divine service fields
    divineServiceHymn: {
        title: "Hino inicial do Culto Divino",
        description: "Qual hino será cantado no início do Culto Divino?",
        field: "divineServiceHymn",
        label: "Nome do hino",
        sabbathOnly: true
    },
    preacherHymn: {
        title: "Hino do pregador",
        description: "Qual hino será cantado antes do sermão?",
        field: "preacherHymn",
        label: "Nome do hino",
        sabbathOnly: true
    },
    divineServiceInitialMusicalMessage: {
        title: "Mensagem musical inicial do Culto Divino",
        description: "Informações sobre a mensagem musical inicial do Culto Divino",
        field: "divineServiceInitialMusicalMessage",
        label: "Nome da mensagem musical (opcional)",
        secondaryField: "divineServiceInitialMusicalMessagePerformer",
        secondaryLabel: "Nome do(a) cantor(a)/músico(a)",
        sabbathOnly: true
    },
    divineServiceFinalMusicalMessage: {
        title: "Mensagem musical final do Culto Divino",
        description: "Informações sobre a mensagem musical final do Culto Divino",
        field: "divineServiceFinalMusicalMessage",
        label: "Nome da mensagem musical (opcional)",
        secondaryField: "divineServiceFinalMusicalMessagePerformer",
        secondaryLabel: "Nome do(a) cantor(a)/músico(a)",
        sabbathOnly: true
    },
    divineServiceFinalHymn: {
        title: "Hino final do Culto Divino",
        description: "Qual hino será cantado no final do Culto Divino?",
        field: "divineServiceFinalHymn",
        label: "Nome do hino",
        sabbathOnly: true
    }
};
